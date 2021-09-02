import {
  useCandidatesCardModal,
  useCandidatesDetailModal,
} from './candidates/useModal-Candidates';
import { useHeader } from './header/index.header';

useHeader();

useCandidatesCardModal();
useCandidatesDetailModal();
