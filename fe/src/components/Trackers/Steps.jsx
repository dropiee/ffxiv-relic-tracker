import accordion from "./Steps.module.css";

const Steps = ({ stage, title, questLocation, reqItems, quest, trackerId }) => {
  const quests = quest.map((x, i) => {
    return (
      <li key={i} className="bg-neutral-500 px-2">
        {x}
      </li>
    );
  });

  return (
    <div className={accordion.wrapCollabsible}>
      <input
        id={`${stage}FOR${trackerId}`}
        className={accordion.toggle}
        type="checkbox"
      />
      <label for={`${stage}FOR${trackerId}`} className={accordion.lblToggle}>
        <div>
          <span className="text-2xl font-bold mr-3">{stage}</span>
          <small className="block">{questLocation}</small>
          <small className="block">{reqItems}</small>
        </div>
      </label>
      <div className={accordion.collapsibleContent}>
        <ul className={accordion.contentInner}>{quests}</ul>
      </div>
    </div>
  );
};

export default Steps;
