import { decodeCookie, getDataFromCookie, newElement } from '../utils/utils';
import { Vote } from '../vote/vote-process';
import { CandidateCard } from './card';
import { CandidateDetails } from './details';
import { useCandidateModal } from './index';
import { CandidateModal } from './modal';

export async function useCandidatesDetailModal() {
  await useCandidateModal({
    modalContainerId: 'candidate-modal-container',
    candidateWrapperClass: 'list-candidates',
    candiateModalConstructor: addCandidateAndModal,
  });
}

export async function useCandidatesCardModal() {
  await useCandidateModal({
    modalContainerId: 'candidate-modal-container',
    candidateWrapperClass: 'candidate-cards-wrapper',
    candiateModalConstructor: addCardAndModal,
  });
}

function addCandidateAndModal(candidate, lang, candidateList) {
  const cDetails = new CandidateDetails(candidate, lang);
  const cModal = new CandidateModal(cDetails);
  const details = cDetails.getDetails();
  const modal = cModal.getModal();
  const closeModalButton = cModal.getCloseButton();
  const openModalButton = cDetails.getOverlay();
  const li = newElement('li', { class: 'candidate-item' });
  li.append(details);
  candidateList.append(li);
  return { openModalButton, closeModalButton, modal };
}

function addCardAndModal(candidate, lang, cardsWrapper) {
  const candidateCard = new CandidateCard(candidate, lang);
  const candidateModal = new CandidateModal(candidateCard);
  const card = candidateCard.getCard();
  const modal = candidateModal.getModal();
  const closeModalButton = candidateModal.getCloseButton();
  const openModalButton = candidateCard.getMoreDetailsButton();
  const voteBtn = candidateCard.getVoteButton();
  hendleVoteProcess(voteBtn);
  cardsWrapper.append(card);

  return { openModalButton, closeModalButton, modal };
}

function hendleVoteProcess(voteBtn) {
  voteBtn.addEventListener('click', initiateVoteProcess);
}

async function initiateVoteProcess(e) {
  try {
    const voteBtn = e.target;
    const candidateID = voteBtn.dataset.id;
    const { UID } = JSON.parse(decodeCookie(getDataFromCookie('ps')));
    const ballot = { candidateID, UID };
    const vote = await new Vote({ ballot, UID }).initialize();
    await vote.runVoteProcess();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    // TODO: invalidate session and redirect to login page
    // redirectTo('/login');
  }
}
