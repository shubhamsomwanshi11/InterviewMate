import React from 'react';
import { FallingLines } from 'react-loader-spinner';
const style={
    loadercontainer :{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:"100vh"
      }
}
const Loader = () => {
    return (
        <div style={style.loadercontainer}>
            <FallingLines
                color="#cf392c"
                width="100"
                visible={true}
                ariaLabel="falling-circles-loading"
            />
        </div>
    );
};

export default Loader;
