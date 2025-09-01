import games from '../assets/projects.json'
import { useParams } from 'react-router'
import { terminal } from 'virtual:terminal'

import GameDisplay from './GameDisplay/GameDisplay'

export default function Game() {
    const { id } = useParams()

    const game = games.find(game => game.id === parseInt(id));

    if (!game) {
        return <h1>The game you are looking for does not exist :((</h1>
    }
    return (
        <div className='game-background'>
            <main className="game">
                <GameDisplay game={game}/>
            </main>
        </div>
    )
}