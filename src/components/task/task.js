import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import './task.css';
import PropTypes from 'prop-types';

class Task extends React.Component {
    render() {
        // if (this.props.isEditing) {
        //     return (
        //         <li className='editing'>
        //             <div className="view">
        //                 <input className="toggle" 
        //                        type="checkbox" 
        //                        checked={this.props.isCompleted} 
        //                        onClick={() => this.props.onClick(this.props.id)}
        //                 />
        //                 <label onClick={() => this.props.onClick(this.props.id)}>
        //                     <span className="description">{this.props.name}</span>
        //                     <span className="created">{this.props.status}</span>
        //                 </label>
        //                 <button className="icon icon-edit"></button>
        //                 <button 
        //                     className="icon icon-destroy"
        //                     onClick={() => {this.props.onDelete(this.props.id)}}
        //                 ></button>
        //             </div>
        //             <input type="text" className="edit"/>
        //         </li>
        //     );
        // };
        return (
            <li className={this.props.isCompleted ? 'completed' : ''} >
                <div className="view">
                    <input className='toggle' 
                           checked={this.props.isCompleted} 
                           type="checkbox" 
                           onClick={() => this.props.onClick(this.props.id)}
                           onChange={(e) => e.target.checked}
                    />
                    <label onClick={() => this.props.onClick(this.props.id)}>
                        <span className="description">{this.props.name}</span>
                        <span className="created">     
                            {`created ${formatDistanceToNow(this.props.status, {
                                                            includeSeconds: true,
                                                            addSuffix: true,
                                        })}`}
                        </span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button 
                        className="icon icon-destroy"
                        onClick={() => {this.props.onDelete(this.props.id)}}
                    ></button>
                </div>
            </li>
        );
    };
};

Task.defaultProps = {
    name: 'To da something',
    id: 1001,
    isEditing: false,
    isCompleted: false,
    onClick: () => {console.log('you click on task')},
    onDelete: () => {console.log('you try to delte this task')},
};

Task.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number,
    isEditing: PropTypes.bool,
    isCompleted: PropTypes.bool,
    onClick: PropTypes.func,
    onDelete: PropTypes.func,
};

export default Task;