import { Plan } from './plan';

export type Spot = {
  area: string;
  place: string;
  image_urls: string[];
  plans: Plan[];
}
