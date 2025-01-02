import { useState } from 'react';
import { SortOptions } from '../../recources/sort-options';

export type PlacesSorterProps = {
  currentSorting: SortOptions;
  onSortingChange: (filter: SortOptions) => void;
}

function PlacesSorter({ currentSorting, onSortingChange }: PlacesSorterProps): JSX.Element {
  const [isActive, setActive] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setActive((active) => !active)}>
        {currentSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isActive ? 'places__options--opened' : null}`}>
        {Object.values(SortOptions).map((sorting) => (
          <li key={sorting}
            className={`places__option ${sorting === currentSorting ? 'places__option--active' : null}`}
            tabIndex={0}
            onClick={() => onSortingChange(sorting)}
          >
            {sorting}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default PlacesSorter;
