import react, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ACTION_TOGGLE_FAV } from '../../state/DashboardReducer';
import { useDashboardDispatch } from '../../state/DashboardState';
import styles from './FullEvent.module.css';

export default function FullEvent({ name, dates, description, images, id, isFavourite }) {
  const dispatch = useDashboardDispatch();
  const toggleFav = useCallback(() => {
    dispatch({
      type: ACTION_TOGGLE_FAV,
      payload: {
        id,
      },
    });
  }, []);
  return (
    <article className={styles.article} data-testid="event">
      <h1>
        <button onClick={toggleFav}>{isFavourite ? 'unfav' : 'fav'}</button>
        {name}
      </h1>
      {dates ? (
        <div>
          {dates.start.localDate} {dates.start.localTime}
        </div>
      ) : null}
      {images && images[0] ? (
        <Image src={images[0].url} alt="" width={images[0].width} height={images[0].height} />
      ) : null}
      <main>{description}</main>
    </article>
  );
}
