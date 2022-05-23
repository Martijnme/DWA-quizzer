import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const GameStopped = (props) => {

    return (
        <div className="Removed">
            <h1>The game is over!</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(GameStopped);
