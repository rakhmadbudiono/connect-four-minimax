import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
const { minimax } = require("../../engine/minimax/index");

const styles = {
  root: {
    maxWidth: "700px",
    margin: "20px auto 20px auto",
    backgroundColor: "blue",
    borderRadius:"10px",
  },
  wCircles: {
    backgroundColor: "white",
    borderRadius: "50%",
    minWidth: "60px",
    minHeight: "60px"
  },
  rCircles: {
    backgroundColor: "red",
    borderRadius: "50%",
    minWidth: "60px",
    minHeight: "60px"
  },
  yCircles: {
    backgroundColor: "yellow",
    borderRadius: "50%",
    minWidth: "60px",
    minHeight: "60px"
  },
  row: {
    margin: "10px"
  },
  title:{
    textAlign:"center",
    fontSize:"32px"
  },
  playsetting:{
    maxWidth:"1000px",
    margin:"auto"
  },
  button:{
    margin:"8px",
    backgroundColor:"grey",
    padding: "20px",
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
      vsCleverComp:false
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
    let finish = true
    const {board} = this.state
    for (let i = 0; i < 6; i++){
        if (board[0][i] == "0"){
          finish = false
          break
        }
    }
    if (finish){
      this.setState({
        end:true,
        win:3
      })
      return
    }
    return;
  }

  checkendSync = event =>{
    for (let i = 0; i < 6; i++){
      for (let j = 0; j < 7; j++){
          if (this.directionCheck(i,j,0,'u') != 0){
            return 1;
          }else if (this.directionCheck(i,j,0,'d') != 0){
            return 1;
          }else if (this.directionCheck(i,j,0,'r') != 0){
            return 1;
          }else if (this.directionCheck(i,j,0,'l') != 0){
            return 1;
          }else if (this.directionCheck(i,j,0,'rh') != 0){
            return 1;
          }else if (this.directionCheck(i,j,0,'lh') != 0){
            return 1;
          }else if (this.directionCheck(i,j,0,'ll') != 0){
            return 1;
          }else if (this.directionCheck(i,j,0,'rl') != 0){
            return 1;
          }
      }
    }
    let finish = true
    const {board} = this.state
    for (let i = 0; i < 6; i++){
        if (board[0][i] == "0"){
          finish = false
          break
        }
    }
    if (finish){
      this.setState({
        end:true,
        win:3
      })
      return 1
    }
    return 0;
  }
  
  adversarialMove = (x,y) => {
    const { board } = this.state;
    const {matRend} = this.state;
    const {classes} = this.props;
    let {turn} = this.state
    let i;
    
      console.log(board)
      if (this.checkendSync() == 0){
        for (i = 0; i < 6; i++) {
          if (board[i][x] == "1" || board[i][x] == "2") {
            if (turn == 2){
              if (y == "pvc"){
                board[i - 1][x] = "2";
                matRend[i-1][x] = (<Grid key={6*(i+1)+x+1} className={classes.rCircles} item />)
                turn = 1;
              }else if (y == "cvc"){
                board[i - 1][x] = "1";
                matRend[i-1][x] = (<Grid key={6*(i+1)+x+1} className={classes.yCircles} item />)
                turn = 1;
              }
              break;
            }else if (turn == 1){
              if (y == "pvc"){
                console.log(i)
                console.log(x)
                board[i - 1][x] = "2";
                matRend[i-1][x] = (<Grid key={6*(i+1)+x+1} className={classes.rCircles} item />)
                turn = 1;
              }else if (y == "cvc"){
                board[i - 1][x] = "1";
                matRend[i-1][x] = (<Grid key={6*(i+1)+x+1} className={classes.yCircles} item />)
                turn = 1;
              }
              break;
            }
          }
        }

        if (i == 6) {
          if (turn == 2){
            if (y == "pvc"){
              board[i - 1][x] = "2";
              matRend[i-1][x] = (<Grid key={6*(i+1)+x+1} className={classes.rCircles} item />)
              turn = 1;
            }else if (y == "cvc"){
              board[i - 1][x] = "1";
              matRend[i-1][x] = (<Grid key={6*(i+1)+x+1} className={classes.yCircles} item />)
              turn = 1;
            }
          }else if (turn == 1){
            if (y == "pvc"){
              board[i - 1][x] = "2";
              matRend[i-1][x] = (<Grid key={6*(i+1)+x+1} className={classes.rCircles} item />)
              turn = 1;
            }else if (y == "cvc"){
              board[i - 1][x] = "1";
              matRend[i-1][x] = (<Grid key={6*(i+1)+x+1} className={classes.yCircles} item />)
              turn = 1;
            }
          }
        }
        this.setState({
          board,
          matRend,
          turn
        });
        this.checkend()
      }
  }
  aiMove = (x,y) =>{
    const {board} = this.state
    let validmoves = []
    for (let i = 0; i < 7; i++){
      if (board[0][i] == "0"){
        validmoves.push(i)
      }
    }
    let rand = Math.floor(Math.random() * validmoves.length);
    if (validmoves.length == 0){
      y['truth'] = true
    }
    if (validmoves.length != 0){
      if (x == "pvc"){
        this.adversarialMove(validmoves[rand],"pvc")
      }else if (x === "cvc"){
        this.adversarialMove(validmoves[rand],"cvc")
      }
    }
  }

  aiMoveClever = (x,y) =>{
    const {board} = this.state
    let numboard = [[], [], [], [], [], []]
    for (let i = 0; i < 6; i++){
      for (let j = 0; j < 7; j++){
        numboard[i].push(parseInt(board[i][j]))
      }
    }
    let obj = minimax(numboard, 5, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, false)
    console.log(board)
    console.log(numboard)
    if (y != null){
      y['truth'] = true
    }
    for (let i = 0; i < 7; i++){
      if (y != null){
        if (board[0][i] == "0"){
          y['truth'] = false
          break
        }
      }
    }
    if (x === "pvc"){
      this.adversarialMove(obj['move'], "pvc")
    }else if (x === "cvc"){
      this.adversarialMove(obj['move'], "cvc")
    }
  }
  
  clickCol = event => {
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
          this.aiMove("pvc")
        }else if (this.state.vsCleverComp){
          this.aiMoveClever("pvc")
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
      vsCleverComp:false
    })
  }

  computerActiveS = event => {
    this.redrawBoard()
    this.aiMove("pvc")
    this.setState({
      vsComp:true,
      vsCleverComp:false
    })
  }

  randomVsrandom = event =>{
    this.redrawBoard()
    let y = {truth:false}
    let end = false
    while (!y['truth'] && !end){
      this.aiMove("pvc",y)
      this.aiMove("cvc",y)
      end = this.checkendSync()
    }
  }
  aiVsrandom = event =>{
    this.redrawBoard()
    let y = {truth:false}
    let end = false
    while (!y['truth'] && !end){
      this.aiMoveClever("cvc", y)
      this.aiMove("pvc", y)
      end = this.checkendSync()
    }
  }
  randomVsai = event =>{
    this.redrawBoard()
    let y = {truth:false}
    let end = false
    while (!y['truth'] && !end){
      this.aiMove("pvc", y)
      this.aiMoveClever("cvc", y)
      end = this.checkendSync()
    }
  }
  aiVsai = event =>{
    this.redrawBoard()
    let y = {truth:false}
    let end = false
    while (!y['truth'] && !end){
      this.aiMoveClever("pvc", y)
      this.aiMoveClever("cvc", y)
      end = this.checkendSync()
    }
  }
  aiVshuman = event =>{
    this.redrawBoard()
    this.aiMoveClever("pvc")
    this.setState({
      vsCleverComp:true,
      vsComp:false
    })
  }
  humanVsai = event =>{
    this.redrawBoard()
    this.setState({
      vsCleverComp:true,
      vsComp:false
    })
  }
  computerInactive = event => {
    this.redrawBoard()
    this.setState({
      vsComp:false,
      vsCleverComp:false,
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
    }else if (this.state.win == 3){
      winner = "Permainan seri!"
    }
    if (this.state.end){
      end = <h2> Game End! Winner is {winner}</h2>
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
        <Grid container direction="row" justify="space-evenly" className={classes.playsetting}>
            <Button className={classes.button} onClick ={this.computerInactive} value={1} key={1}>vs Human</Button>
            <Button className={classes.button} onClick ={this.computerActiveF} value={2} key={2}>vs Computer (Go First)</Button>
            <Button className={classes.button} onClick ={this.computerActiveS} value={2} key={2}>vs Computer (Go Second)</Button>
            <Button className={classes.button} onClick = {this.randomVsrandom}>Random vs Random</Button>
            <Button className={classes.button} onClick = {this.aiVsrandom}>AI (first) vs Random</Button>
            <Button className={classes.button} onClick = {this.randomVsai}>AI vs Random (first)</Button>
            <Button className={classes.button} onClick = {this.aiVsai}>AI vs AI</Button>
            <Button className={classes.button} onClick = {this.aiVshuman}>AI (first) vs Human</Button>
            <Button className={classes.button} onClick = {this.humanVsai}>AI vs Human (first)</Button>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Game);
