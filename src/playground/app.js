class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleReamoveAll = this.handleReamoveAll.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleRemoveOption = this.handleRemoveOption.bind(this);
        this.state = {
            options : []
        }
    }
    componentDidMount(){
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState(()=>({options}))
            } 
        } catch(e){

        } 
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !==this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    handleAddOption(option){
        if(!option){
            return 'Enter Valid text';
        } else if(this.state.options.indexOf(option)>-1){
            return 'Element Already Exists';
        }
        this.setState((prevState)=>{
            return {
                options: prevState.options.concat(option)
            };
        })
    }
    handleRemoveOption(optionToRemove){
        this.setState((prevState)=>{
            return {
                options : prevState.options.filter((option)=>{
                    return optionToRemove !==option;
                })
            }
        })
    }
    handlePick(){
        const random = Math.floor(Math.random() * this.state.options.length);
        let option = this.state.options[random];
        alert(option);
    }
    handleReamoveAll(){
        this.setState(()=>{
            return {
                options : []
            }
        });
    }
    render(){
        const title = "Indecision";
        const subtitle = "Your life in hands of comp";
        return (<div>
            <Header title = {title} subtitle={subtitle}/>
            <Action handleReamoveAll={this.handleReamoveAll} removeOption = {this.state.options.length > 0} handlePick={this.handlePick}/>
            <Options options = {this.state.options} handleRemoveOption={this.handleRemoveOption} />
            <Addoption handleAddOption = {this.handleAddOption} />
        </div>);
    }
}

const Header =(props)=>{
    return(
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
}
const Action = (props) =>{
    return (
        <div>
            <button disabled={!props.removeOption} onClick={props.handlePick}>What should I do</button>
            <button onClick={props.handleReamoveAll}>Remove</button>
        </div>
    );
}
const Options = (props) => {
    return (<div>
        {props.options.length===0 && <p>Please add an option to get started</p>}
        {
            props.options.map((option)=><Option key={option} optionText={option} handleRemoveOption = {props.handleRemoveOption}/>)
        }
    </div>);
}
const Option = (props)=>{
    return (<div>
        {props.optionText}
        <button onClick={(e)=>{
            props.handleRemoveOption(props.optionText);
        }}>Remove</button>
    </div>);
}

class Addoption extends React.Component{
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error : undefined
        }
    }
   handleAddOption(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        this.setState(()=>{
            return {
                error
            }
        })
        if(!error){
            e.target.elements.option.value='';
        }
    }
    render(){
        return (
        <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.handleAddOption}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
           
        </div>);
    }
}

ReactDOM.render(<IndecisionApp/>,document.getElementById('app'));