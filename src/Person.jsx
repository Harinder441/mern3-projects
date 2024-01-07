class Person extends React.Component {
    constructor(props){
        super(props)
        this.intialState = { avatar: "https://pdtxar.com/wp-content/uploads/2019/04/person-placeholder.jpg",
        email:'',
        first_name:'',
        last_name:''
      }
        this.state = {
          ...this.intialState
        }
    }
    async handleClick(num){
        const res = await this.fetchData(num);
        if(res){
          this.setState(res);
        }
        else{
          alert("Something went wrong")
          this.setState(this.intialState);
        }
    }
    async fetchData(num){
      try{
        const res = await fetch('https://reqres.in/api/users/'+num);
        if(res.status===200){
        const json = await res.json();
        return json.data;
        }
        else{
          throw new Error('Error getting Data');
        }

      }
      catch(e){
        console.log(e);
        return null;
      }
    
    }


    render() {
   const {avatar,first_name,last_name,email} = this.state;
    return (
        <div>
            <div>
            <button onClick={()=>this.handleClick(1)}>1</button>
            <button onClick={()=>this.handleClick(2)}>2</button>
            <button onClick={()=>this.handleClick(3)}>3</button>
            <button onClick={()=>this.handleClick(100)}>100</button>
            </div>
            <ul>
            <li><h4>Email:{email}</h4></li>
              <li><h4>Name:{first_name} {last_name}</h4></li>
            </ul>
            <img src={avatar} alt="person" />
      </div>);
    }
  }