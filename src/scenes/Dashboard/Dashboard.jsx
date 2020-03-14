import React, { Component } from 'react';

import { ElevateAppBar } from '../../components';
import { Canvas } from './components';
import { cameraConfig } from '../../config';

class Dashboard extends Component {
    handleSave = () => {
        this.canvas.saveScene();
    }
    render() {
        return (
            <ElevateAppBar appName={'Assets-Lux'} onSave={this.handleSave}>
                <Canvas
                    ref={ref => this.canvas = ref} 
                    camera={cameraConfig}
                />
            </ElevateAppBar>
        );
    }
}

export default Dashboard;