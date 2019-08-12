import React from 'react';

const Stars = (props) => {
    let random = props.starsNum;
    let stars = [];
    while(random > 0) {
        stars.push(<i className="fa fa-star fa-2x"></i>);
        random--;
    }    
    return stars;
};

export default Stars;