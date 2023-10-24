import { useEffect } from "react";
import { getMeetups } from "../../api";

export default function ListMeetup() {
  useEffect(() => {
    getMeetups();
  }, []);

  return <div></div>;
}
