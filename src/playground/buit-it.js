class VisibilityToggle extends React.Component {
    constructor(props){
        super(props);
        this.visibility = this.visibility.bind(this);
        this.state = {
            visibility : false
        }
    }
    visibility(){
        this.setState((prevState)=>{
            return {
                visibility : !prevState.visibility
            }
        });
    }
    render(){
        return (
            <div>
                <button onClick={this.visibility}>{this.state.visibility ? 'show details' : 'hide details'}</button>  
                <p>{this.state.visibility ? '': "hey u cant see me"}</p>    
            </div>
        );
    }
}
ReactDOM.render(<VisibilityToggle/>, document.getElementById('app'));

// const head = {
//     title: "Visibility Toggle",
//     details: "hey, now you can see the details"

// };
// let toggle = 0;
// const show = () => {
// toggle = !toggle;
// rerender();
// }
// const rerender = () => {
// const template = (
//     <div>
//         <h1>{head.title}</h1>
//         <button onClick={show}>{toggle==0 ? 'Show Details' : 'Hide Details' }</button>
//         <p>{toggle==0 ? '': head.details}</p>
//     </div>
// );
// ReactDOM.render(template,appRoot);
// }
// const appRoot = document.getElementById('app');

// rerender();
