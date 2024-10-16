import './block_info.css';

interface BlockInfoProps {
    blockHeight: string; // The state value being passed
    onGetBlockHeight: () => void; // The callback function being passed
}
  

const Block_height: React.FC<BlockInfoProps> = ({onGetBlockHeight, blockHeight}) => {

    function onClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault(); 
        onGetBlockHeight();
    }

    return (
        <div className="height_text_container">
            <h1>Bitcoin Block Height Checker</h1>
            <button className="height_btn" onClick={onClick}>Get Current Block Height</button>

            <div id="block-height">
                Block Height is: {blockHeight}
            </div>
        </div>
    )
}

export default Block_height;