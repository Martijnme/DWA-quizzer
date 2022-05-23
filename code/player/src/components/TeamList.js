import PlayerItem from "../components/PlayerItem"
import Button from "../components/Button"

function TeamList(props) {
  return (
    <div className='TeamList'>
      <h2><input placeholder='Team Name' /></h2>
      <div className="playerList">
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <button className="clear-btn">...</button>
        <Button text='submit' classStyle='btn-primary' />
      </div>
    </div>
  )
}

export default TeamList
