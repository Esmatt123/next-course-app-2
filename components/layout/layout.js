const { Fragment } = require("react");
const { default: MainHeader } = require("./main-header");

function Layout(props) {
    return <Fragment>
        <MainHeader />
        <main>
            {props.children}
        </main>
    </Fragment>
}

export default Layout