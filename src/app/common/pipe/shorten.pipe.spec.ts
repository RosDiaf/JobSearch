import { ShortenPipe } from './shorten.pipe';
import { events } from '../../common/events';

fdescribe('ShortenPipe', () => {
  let pipe: ShortenPipe;

  beforeEach(() => {
    pipe = new ShortenPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('providing no value returns fallback', () => {
    const event = `The Linux Foundation has released its entire 2018 events schedule.
    The nonprofit organisation insists that it maintains a mission focused on the
    'creators, maintainers and practitioners' of open `;

    expect(pipe.transform(event, 100)).toBe(`The Linux Foundation has released its entire 2018 events schedule.
    The nonprofit organisation in...`);
  });
});
