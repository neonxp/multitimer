import { defaultTimer } from "./timerTemplate";

export const configFromLink = () => {
    const config = window.location.hash;
    if (config === "") {
      return [{ ...defaultTimer }];
    }
    return JSON
      .parse(decodeURIComponent(escape(window.atob(config.replace("#", "")))))
      .map(t => ({ ...defaultTimer, name: t[0], initialTime: t[1], time: t[1] }));
  }
