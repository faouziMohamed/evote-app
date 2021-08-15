import { useHeaderMenu } from './header/headerMenu';
import { useUserCard } from './header/headerUserCard';

export default function useHeader() {
  useHeaderMenu();
  useUserCard();
}
