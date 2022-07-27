import {FiltersNames, useAppContext} from "../../api/contextProvider";

export const StatusFilter = () => {
    const { filter, setFilter } = useAppContext();

    const buttons = [
        {name: FiltersNames.ALL, label: 'All'},
        {name: FiltersNames.ACTIVE, label: 'Active'},
        {name: FiltersNames.DONE, label: 'Done'},
    ];

    const items = buttons.map(({name, label}) => {
        const className = filter === name
            ? 'btn btn-info'
            : 'btn btn-outline-secondary';
        return <button type="button"
                       key={name}
                       className={className}
                       onClick={() => setFilter(name)}
        >{label}</button>
    });

    return (
        <div className="btn-group filter">
            {items}
        </div>
    );
};
