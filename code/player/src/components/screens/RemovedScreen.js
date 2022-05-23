import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const RemovedScreen = (props) => {

    return (
        <div className="Removed">
            <h1>You have been removed from the game ):</h1>
            <Link to="/">
                <button className="btn btn-primary btn-center">Home</button>
            </Link>
        </div>
    )
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RemovedScreen);
