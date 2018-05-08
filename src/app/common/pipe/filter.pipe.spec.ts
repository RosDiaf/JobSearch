import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;
  let events;
  let eventsEmpty;

  beforeEach(() => {
    pipe = new FilterPipe();

    events = [
      {
        title: 'Linux Foundation 2018 events list',
        author: 'Adrian Bridgwater',
        date: '27 Nov 2017',
        url: 'http://events17.linuxfoundation.org/events/linux-foundation-member-legal-summit',
        image: '../../assets/img/linuxfundation2018.jpg',
        description: `The Linux Foundation has released its entire 2018 events schedule.
        The nonprofit organisation insists that it maintains a mission focused on the
        'creators, maintainers and practitioners' of open `
    }];

    eventsEmpty = [];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return value if empty array', () => {
    expect(pipe.transform(eventsEmpty, 'title', 'Linux Foundation 2018 events list')).toBe(eventsEmpty);
  });

  it('should return value requested if present in the event\'s array', () => {
    expect(pipe.transform(events, 'Linux Foundation 2018 events list', 'title')).not.toBeUndefined();
  });

  it('should not return value if not present in the event\'s array', () => {
    expect(pipe.transform(events, 'OPNF Plugfest', 'title')).not.toBeUndefined();
  });
});
