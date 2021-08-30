import { useHeader } from './header/index.header';
import { drawChart } from './results/charts';

useHeader();
(async () => drawChart())();
