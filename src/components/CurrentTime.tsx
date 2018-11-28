import * as React from 'react';
import { Component } from 'react';

export class CurrentTime extends Component {
    private stopped: boolean;
    private lastTime: number;
    public state: {
        time: string;
    };

    constructor(props: any) {
        super(props);
        this.state = {
            time: this.getTimeString()
        };
        this.stopped = true;
    }

    componentDidMount() {
        this.stopped = false;
        this.updateTime();
    }

    componentWillUnmount() {
        this.stopped = true;
    }

    updateTime() {
        if (this.stopped) {
            return;
        }
        requestAnimationFrame((ts) => {
            if (!this.lastTime) {
                this.lastTime = ts;
            }

            if (ts - this.lastTime >= 1000) {
                this.setState({
                    time: this.getTimeString()
                });
                this.lastTime = ts;
            }
            this.updateTime();
        });
    }

    getTimeString() {
        const now = new Date();
        return `${now.toDateString()}, ${now.toLocaleTimeString()}`;
    }
    render() {
        const style = {
            width: "265px", 
            textAlign: "left",
            fontSize: "1.2em"
        }
        return (
            <span style={style as React.CSSProperties } className="badge badge-info">
                {this.state.time}
            </span>
        );
    }
}