import './listBox.scss';

interface IListBoxProps {
  textList: Array<string>,
  searchText: string,
  handleItemClicked: (...any: any) => void
}

const ListBox: React.FC<IListBoxProps> = ({textList, searchText, handleItemClicked}: IListBoxProps) => {


    return (
    <div className="SearchSuggestions-Container">
        <ul className="SearchSuggestions-List">
            {textList.map((text, index)=>(
              <li key={index} className="SearchSuggestions-Item" onClick={() => {handleItemClicked(text)}}>
                {
                text.substring(0, text.toLowerCase().indexOf(searchText.toLowerCase()))}
                <span className="SearchSuggestions-HighlightedText">{searchText}</span>
                {text.toLowerCase().substring(text.toLowerCase().indexOf(searchText.toLowerCase())+searchText.length)}
              </li>
      ))}
    </ul>
  </div>)
}
    

export default ListBox;