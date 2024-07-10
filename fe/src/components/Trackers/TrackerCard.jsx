import Steps from "./Steps.jsx";
import DeleteTracker from "./DeleteTracker.jsx";
import accordion from "./TrackerCard.module.css";

const TrackerCard = ({
  trackerId,
  trackerSeries,
  trackerJob,
  steps,
  onReload,
}) => {
  const stepsList = steps.map((x, i) => {
    return (
      <Steps
        key={i}
        trackerId={trackerId}
        stage={x.stage}
        title={x.title}
        questLocation={x.questLocation}
        reqItems={x.reqItems}
        quest={x.quest}
      />
    );
  });

  return (
    <div className="flex">
      <div className={accordion.wrapCollabsible}>
        <input id={trackerId} className={accordion.toggle} type="checkbox" />
        <label for={trackerId} className={accordion.lblToggle}>
          <div>
            <h1 className="text-3xl font-bold">{trackerSeries}</h1>
            <h2 className="text-xl mb-2">{trackerJob}</h2>
          </div>
        </label>
        <div className={accordion.collapsibleContent}>
          <div className={accordion.contentInner}>{stepsList}</div>
        </div>
      </div>

      <DeleteTracker trackerId={trackerId} onReload={onReload} />
    </div>
  );
};

export default TrackerCard;
