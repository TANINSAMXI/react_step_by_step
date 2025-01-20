import {Component} from 'react';
import {ListGroup, Button} from "react-bootstrap";
import PropTypes from 'prop-types';

class EmojiBattle extends Component {
    constructor(props) {
        super(props);

        const initialState = this.props.data.reduce((acc, item) => {
            acc[item.id.toString()] = 0;
            return acc;
        }, {});

        this.state = {
            clickedEmoji: initialState,
        };
    }

    clickHandler = (id) => () => {
        const {clickedEmoji} = this.state;

        this.setState({
            clickedEmoji: {
                ...clickedEmoji,
                [id]: clickedEmoji[id] + 1,
            },
        });
    };

    summaryHandler = () => {
        const {data} = this.props;
        const {clickedEmoji} = this.state;

        const entries = Object.entries(clickedEmoji);

        let biggestEntryValue = -Infinity;
        let biggestEntryId = null;

        for (const [key, value] of entries) {
            if (value > biggestEntryValue) {
                biggestEntryValue = value;
                biggestEntryId = key;
            }
        }

        if (biggestEntryId !== null) {
            const emojiData = data.find(({id}) => id.toString() === biggestEntryId);
            if (emojiData) {
                alert(`Most clicked emoji: ${emojiData.emoji}`)
                console.log(`Most clicked emoji: ${emojiData.emoji}`);
            }
        } else {
            console.log('No emoji clicked.');
        }
    };

    render() {
        const {clickedEmoji} = this.state;
        const {data} = this.props;

        return (
            <div>
                <ListGroup className="cursor-pointer">
                    {data.map(({id, emoji}) => (
                        <ListGroup.Item key={id} onClick={this.clickHandler(id.toString())}>
                            {emoji} | Click count ({clickedEmoji[id.toString()]})
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Button type="button" variant="success" onClick={this.summaryHandler}>
                    Show results!
                </Button>
            </div>
        );
    }
}


EmojiBattle.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            emoji: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default EmojiBattle;
