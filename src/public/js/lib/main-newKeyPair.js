import { runOnLoad } from './new-pair/new-pair';
import { displayError } from './new-pair/new-pair.utils';

runOnLoad().catch(displayError);
