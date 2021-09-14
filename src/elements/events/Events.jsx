import react, { useEffect, useState } from 'react';
import Event from '../event/Event';
import styles from './Events.module.css';

export default function Events({ events }) {
  return events && events.size ? (
    <ul className={styles.events}>
      {[...events.values()].map((event) =>
        event.isVisible ? (
          <li data-testid="event-list-item" key={event.id} className={styles['events__list-item']}>
            <Event {...event} />
          </li>
        ) : null
      )}
    </ul>
  ) : null;
}
