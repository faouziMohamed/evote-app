import { fetchAllCandidateDetails, useModal } from './candidates.utils';

const removeLoader = () => {
  const hasLoader = document.querySelector('.has-loader');
  hasLoader?.replaceChildren();
  hasLoader?.classList.remove('has-loader');
};

export async function useCandidateModal({
  modalContainerId,
  candidateWrapperClass,
  candiateModalConstructor,
}) {
  const { data } = await fetchAllCandidateDetails();

  const modalContainer = document.querySelector(`#${modalContainerId}`);
  const candidateWrapper = document.querySelector(`.${candidateWrapperClass}`);
  if (!modalContainer || !candidateWrapper) return;
  const lang = localStorage.getItem('lang');

  removeLoader();
  data.forEach((candidate) => {
    const { openModalButton, closeModalButton, modal } =
      candiateModalConstructor(candidate, lang, candidateWrapper);

    useModal({
      modalContainerElment: modalContainer,
      openButtonElement: openModalButton,
      closeButtonElement: closeModalButton,
      modal,
    });
  });
}

export { fetchAllCandidateDetails, getCandidateData } from './candidates.utils';
export { CandidateCard } from './card';
export { CandidateDetails } from './details';
export { CandidateModal } from './modal';
