import React, { useCallback } from 'react';
import { Spin } from 'antd';
import './loadding.modules.scss'
const Loadding = (props) => {
    const { ld } = props;
    const Component = useCallback(() => {
        if (!!ld) {
            return (
                <div className="example">
                    < Spin />
                </div >
            )
        } else if (!ld) {
            return <div />
        }
    }, [ld]);

    return <Component />
};

export default Loadding;