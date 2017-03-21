import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/Dropdown.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }
  toggleMenu() {
    this.setState(state => ({
      showMenu: !state.showMenu
    }));
  }
  render() {
    var categories = ['documentation', 'guides', 'talksAndSlides'];
    if (!this.state.showMenu) {
      return (
        <div className="dropdown-closed">
          <Link
            to={
              `/resources/${this.props.match.params.category}/${this.props.match.params.technology}`
            }
            onClick={() => this.toggleMenu()}
          >
            <h1>
              &#x025B8;
              {' '}
              {this.props.match.params.category
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, s => s.toUpperCase())}
            </h1>
          </Link>
        </div>
      );
    }
    return (
      <div className="dropdown">
        <div className="dropdown-open">
          <div className="dropdown-open-initial">
            <Link
              to={
                `/resources/${this.props.match.params.category}/${this.props.match.params.technology}`
              }
              onClick={() => this.toggleMenu()}
            >
              <h1>
                &#x025BE;
                {' '}
                {this.props.match.params.category
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, s => s.toUpperCase())}
              </h1>
            </Link>
          </div>
          <div className="dropdown-popover">
            <ul>
              {categories.reduce(
                (acc, curr, index) => {
                  if (this.props.match.params.category !== curr) {
                    acc.push(
                      <Link
                        to={
                          `/resources/${curr}/${this.props.match.params.technology}`
                        }
                        key={index}
                        onClick={() => this.toggleMenu()}
                      >
                        <li>
                          <h2>
                            {curr
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/^./, s => s.toUpperCase())}
                          </h2>
                        </li>
                      </Link>
                    );
                    return acc;
                  }
                  return acc;
                },
                []
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Dropdown;
