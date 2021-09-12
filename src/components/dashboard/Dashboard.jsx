import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Event from "../../elements/event/Event";
import Events from "../../elements/events/Events";
import Filters from "../filters/Filters";
import useEventsDataSource from "./Dashboard.dataSource";
import styles from "./Dashboard.module.css";

const MemoizedEvents = React.memo(Events);

export default function Dashboard({ page }) {
  const [events] = useEventsDataSource(page);

  return (
    <>
      <Filters />
      <MemoizedEvents events={events} />
      <div className={styles.dashboard__pagination}>
        <button className={styles["dashboard__pagination-button"]}>
          Load more
        </button>
      </div>
    </>
  );
}
