import React, { Component } from 'react';

export default class StatusFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];

  render() {
    const { active, setFilter } = this.props;
    const items = this.buttons.map(({ name, label }) => {
      const className = active === name
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
  }
};
