import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { flexbox } from "@material-ui/system";

const styles = {
  root: {
    maxWidth: "800px",
    margin: "20px auto 20px auto",
    backgroundColor: "blue",
    borderRadius:"10px",
  },
  wCircles: {
    backgroundColor: "white",
    borderRadius: "50%",
    minWidth: "100px",
    minHeight: "100px"
  },
  rCircles: {
    backgroundColor: "red",
    borderRadius: "50%",
    minWidth: "100px",
    minHeight: "100px"
  },
  yCircles: {
    backgroundColor: "yellow",
    borderRadius: "50%",
    minWidth: "100px",
    minHeight: "100px"
  },
  row: {
    margin: "10px"
  },
  title:{
    textAlign:"center",
    fontSize:"32px"
  },
  playsetting:{
    display:"flex",
    flexDirection:"row",
    maxWidth:"600px",
    margin:"auto"
  },
  button:{
    margin:"8px",
    backgroundColor:"grey",
    color:"white",
    '&:hover':{
      backgroundColor:"grey"
    },
    '&:active':{
      backgroundColor:"grey"
    }
  }
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    const matStat = [];
    for (let i = 0; i < 6; i++) {
      const matStatRow = [];
      for (let j = 0; j < 7; j++) {
        matStatRow.push("0");
      }
      matStat.push(matStatRow);
    }
    this.state = {
      board: matStat,
      matRend: [[], [], [], [], [], []],
      turn: 1,
      end:false,
      lock:false,
      win:null,
      vsComp:false,
    };
  }

  directionCheck(x,y,n,direct){
    const {board} = this.state
    if (n == 3){
      if (board[x][y] == '1'){
        this.setState({
          win:1
        })
        return 1
      }else if (board[x][y] == '2'){
        this.setState({
          win:2
        })
        return 2
      }
      
    }else{
      
      if (direct == 'l' && x-1 > -1 ){
        if (board[x-1][y] == board[x][y]  && board[x][y] !== '0'){
            
            n++;
            direct = 'l'
            x -= 1
            return this.directionCheck(x,y,n,direct)
        }
      } 
      if (direct == 'r' && x+1 < 6 ){
        if (board[x+1][y] == board[x][y] && board[x][y] !== '0'){
          
          n++;
          direct = 'r'
          x += 1
          return this.directionCheck(x,y,n,direct)
        }
      } 
      if (direct == 'd' && y-1 > -1 ){
        if (board[x][y-1] == board[x][y] && board[x][y] !== '0'){
          
          n++;
          direct = 'd'
          y -= 1
          return this.directionCheck(x,y,n,direct)
        }
      } 
      if (direct == 'u' && y+1 < 7 ){
        if (board[x][y+1] == board[x][y]  && board[x][y] !== '0'){
          
          n++;
          direct = 'u'
          y += 1
          return this.directionCheck(x,y,n,direct)
        }
      } 
      if (direct == 'rh' && y+1 < 7 && x+1 <6 ){
        if (board[x+1][y+1] == board[x][y]  && board[x][y] !== '0'){
          
          n++;
          direct = 'rh'
          y += 1
          x += 1
          return this.directionCheck(x,y,n,direct)
        }
      } 
      if (direct == 'rl' && x+1 < 6 && y-1 > -1){
        if (board[x+1][y-1] == board[x][y]  && board[x][y] !== '0'){
          
          n++;
          direct = 'rl'
          y -= 1
          x += 1
          return this.directionCheck(x,y,n,direct)
        }
      }
       if (direct == 'll' && x-1 > -1 && y-1 > -1){
        if (board[x-1][y-1] == board[x][y]  && board[x][y] !== '0'){
          
          n++;
          direct = 'll'
          y -= 1
          x -= 1
          return this.directionCheck(x,y,n,direct)
        }
      }
       if (direct == 'lh' && y+1 < 7 && x-1 > -1){
        if (board[x-1][y+1] == board[x][y] && board[x][y] !== '0'){
          n++;
          direct = 'lh'
          y += 1
          x -= 1
          return this.directionCheck(x,y,n,direct)
        }
      }
        
        return 0;
    }
  }
  checkend = event =>{
    for (let i = 0; i < 6; i++){
      for (let j = 0; j < 7; j++){
          if (this.directionCheck(i,j,0,'u') != 0){
            this.setState({
              end:true
            })
            return;
          }else if (this.directionCheck(i,j,0,'d') != 0){
            this.setState({
              end:true
            })
            return;
          }else if (this.directionCheck(i,j,0,'r') != 0){
            this.setState({
              end:true
            })
            return;
          }else if (this.directionCheck(i,j,0,'l') != 0){
            this.setState({
              end:true
            })
            return;
          }else if (this.directionCheck(i,j,0,'rh') != 0){
            this.setState({
              end:true
            })
            return;
          }else if (this.directionCheck(i,j,0,'lh') != 0){
            this.setState({
              end:true
            })
            return;
          }else if (this.directionCheck(i,j,0,'ll') != 0){
            this.setState({
              end:true
            })
            return;
          }else if (this.directionCheck(i,j,0,'rl') != 0){
            this.setState({
              end:true
            })
            return;
          }
      }
    }
    return;
  }
  adversarialMove = x => {
    const { board } = this.state;
    const {matRend} = this.state;
    const {classes} = this.props;
    let {turn} = this.state
    let i;

      
        for (i = 0; i < 6; i++) {
          if (board[i][x] == "1" || board[i][x] == "2") {
            if (turn == 2){
              board[i - 1][x] = "1";
              matRend[i-1][x] = (<Grid key={6*(i+1)+x+1} className={classes.yCircles} item />)
              turn = 2;
              break;
            }else if (turn == 1){
              board[i - 1][x] = "2";
              matRend[i-1][x] = (<Grid key={6*(i+1)+x+1} className={classes.rCircles} item />)
              turn = 1;
              break;
            }
          }
        }

        if (i == 6) {
          if (turn == 2){
            board[i - 1][x] = "1";
            matRend[i-1][x] = (<Grid key={6*(i+1)+x+1} className={classes.yCircles} item />)
            turn = 2;
          }else if (turn == 1){
            board[i - 1][x] = "2";
            matRend[i-1][x] = (<Grid key={6*(i+1)+x+1} className={classes.rCircles} item />)
            turn = 1;
          }
        }
        this.setState({
          board,
          matRend,
          turn
        });
        this.checkend()
      
  }
  aiMove = event =>{
    let rand = Math.floor(Math.random() * 7);
    console.log(rand)
    this.adversarialMove(rand)
  }
  
  clickCol = event => {
    console.log(event.target)
    const { board } = this.state;
    const {matRend} = this.state;
    const {classes} = this.props;
    let {turn} = this.state
    let i;
      if (!this.state.end){
        for (i = 0; i < 6; i++) {
          if (board[i][event.target.getAttribute('value')] == "1" || board[i][event.target.getAttribute('value')] == "2") {
            if (turn == 1){
              board[i - 1][event.target.getAttribute('value')] = "1";
              matRend[i-1][event.target.getAttribute('value')] = (<Grid key={6*i+event.target.getAttribute('value')} className={classes.yCircles} item />)
              turn = 2;
              break;
            }else if (turn == 2){
              board[i - 1][event.target.getAttribute('value')] = "2";
              matRend[i-1][event.target.getAttribute('value')] = (<Grid key={6*i+event.target.getAttribute('value')} className={classes.rCircles} item />)
              turn = 1;
              break;
            }
          }
        }

        if (i == 6) {
          if (turn == 1){
            board[i - 1][event.target.getAttribute('value')] = "1";
            matRend[i-1][event.target.getAttribute('value')] = (<Grid key={6*i+event.target.getAttribute('value')} className={classes.yCircles} item />)
            turn = 2;
          }else if (turn == 2){
            board[i - 1][event.target.getAttribute('value')] = "2";
            matRend[i-1][event.target.getAttribute('value')] = (<Grid key={6*i+event.target.getAttribute('value')} className={classes.rCircles} item />)
            turn = 1;
          }
        }
        this.setState({
          board,
          matRend,
          turn
        });
        this.checkend()
        if (this.state.vsComp){
          this.aiMove()
        }
      }
    }

  redrawBoard = event =>{
    let {board,matRend,end,win,turn} = this.state
    end = false
    win = null
    turn = 1
    const {classes} = this.props
    let counter = 0
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        board[i][j] = "0"
        counter += 1
        let key = counter
        console.log(key)
        switch(j){         
          case 0:
            matRend[i][j] = (
              <Grid key={key} className={classes.wCircles} item>
                <Button
                  className={classes.wCircles}
                  onClick={this.clickCol}
                  value={0}
                />
              </Grid>
            );
            break
          case 1:
          matRend[i][j] = (
            <Grid key={key} className={classes.wCircles} item>
              <Button
                className={classes.wCircles}
                onClick={this.clickCol}
                value={1}
              />
            </Grid>
          );
          break
          case 2:
          matRend[i][j] = (
            <Grid key={key} className={classes.wCircles} item>
              <Button
                className={classes.wCircles}
                onClick={this.clickCol}
                value={2}
              />
            </Grid>
          );
          break
          case 3:
          matRend[i][j] = (
            <Grid key={key} className={classes.wCircles} item>
              <Button
                className={classes.wCircles}
                onClick={this.clickCol}
                value={3}
              />
            </Grid>
          );
          break
          case 4:
          matRend[i][j] = (
            <Grid key={key} className={classes.wCircles} item>
              <Button
                className={classes.wCircles}
                onClick={this.clickCol}
                value={4}
              />
            </Grid>
          );
          break
          case 5:
          matRend[i][j] = (
            <Grid key={key} className={classes.wCircles} item>
              <Button
                className={classes.wCircles}
                onClick={this.clickCol}
                value={5}
              />
            </Grid>
          );
          break
          case 6:
          matRend[i][j] = (
            <Grid key={key} className={classes.wCircles} item>
              <Button
                className={classes.wCircles}
                onClick={this.clickCol}
                value={6}
              />
            </Grid>
          );
          break
        }
      }
    }
      this.setState({
        board,end,win,turn
      })
    }
    
  computerActiveF = event => {
    this.redrawBoard()
    this.setState({
      vsComp:true,
    })
  }

  computerActiveS = event => {
    this.redrawBoard()
    this.aiMove()
    this.setState({
      vsComp:true,
    })
  }

  computerInactive = event => {
    this.redrawBoard()
    this.setState({
      vsComp:false
    })
  }

  drawBoard = event => {
    const { classes } = this.props;
    let { matRend } = this.state;
    let { board } = this.state;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        const key = 6 * i + j;
        if (board[i][j] == "0") {
          if (j == 0) {
            matRend[i].push(
              <Grid key={key} className={classes.wCircles} item>
                <Button
                  className={classes.wCircles}
                  onClick={this.clickCol}
                  value={0}
                />
              </Grid>
            );
          } else if (j == 1) {
            matRend[i].push(
              <Grid key={key} className={classes.wCircles} item>
                <Button
                  className={classes.wCircles}
                  onClick={this.clickCol}
                  value={1}
                />
              </Grid>
            );
          } else if (j == 2) {
            matRend[i].push(
              <Grid key={key} className={classes.wCircles} item>
                <Button
                  className={classes.wCircles}
                  onClick={this.clickCol}
                  value={2}
                />
              </Grid>
            );
          } else if (j == 3) {
            matRend[i].push(
              <Grid key={key} className={classes.wCircles} item>
                <Button
                  className={classes.wCircles}
                  onClick={this.clickCol}
                  value={3}
                />
              </Grid>
            );
          } else if (j == 4) {
            matRend[i].push(
              <Grid key={key} className={classes.wCircles} item>
                <Button
                  className={classes.wCircles}
                  onClick={this.clickCol}
                  value={4}
                />
              </Grid>
            );
          } else if (j == 5) {
            matRend[i].push(
              <Grid key={key} className={classes.wCircles} item>
                <Button
                  className={classes.wCircles}
                  onClick={this.clickCol}
                  value={5}
                />
              </Grid>
            );
          } else if (j == 6) {
            matRend[i].push(
              <Grid key={key} className={classes.wCircles} item>
                <Button
                  className={classes.wCircles}
                  onClick={this.clickCol}
                  value={6}
                />
              </Grid>
            );
          }
        }
      }
    }
    this.setState({
      matRend
    });
  };

  componentDidMount() {
    this.drawBoard();
  }

  render() {
    const { classes } = this.props;
    const { matRend } = this.state;
    let end = null
    let winner = null
    
    if (this.state.win == 1){
      winner = "Player 1"
    }else if (this.state.win == 2){
      winner = "Player 2"
    }
    if (this.state.end){
      end = <h1> Game End! Winner is {winner}</h1>
    }else{
      end = null;
    }
    return (
      <div>
        <div className={classes.title}>
          Connect 4
        </div>
        <div className={classes.title}>
        {end}
        </div>
        <Grid container className={classes.root} justify="space-between">
          <Grid
            container
            direction="row"
            justify="space-evenly"
            className={classes.row}
          >
            {matRend[0]}
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            className={classes.row}
          >
            {matRend[1]}
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            className={classes.row}
          >
            {matRend[2]}
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            className={classes.row}
          >
            {matRend[3]}
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            className={classes.row}
          >
            {matRend[4]}
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            className={classes.row}
          >
            {matRend[5]}
          </Grid>
        </Grid>
        <div className={classes.playsetting}>
            <Button className={classes.button} onClick ={this.computerInactive} value={1} key={1}>vs Human</Button>
            <Button className={classes.button} onClick ={this.computerActiveF} value={2} key={2}>vs Computer (Go First)</Button>
            <Button className={classes.button} onClick ={this.computerActiveS} value={2} key={2}>vs Computer (Go Second)</Button>
            <Button className={classes.button}>Computer vs Computer</Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Game);
