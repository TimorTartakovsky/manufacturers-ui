import React, { Component } from 'react';
// import Fotter from './Fotter';
import Header from './Header';

export interface ILayoutProps {}
export interface ILayoutState {}

class Layout extends Component<ILayoutProps, ILayoutState> {

    public render(): React.ReactElement {
        return (
            <>
                <div style={{ display: 'flex' }}>
                    <Header />
                    <main style={{
                        flexGrow: 1,
                        height: '100vh',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        paddingTop: '80px'
                    }}>
                        {this.props.children} 
                        {/* <Fotter /> */}
                    </main>
                </div>
            </>
        )
    }
}

export default Layout;
