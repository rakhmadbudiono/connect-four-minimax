import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    maxWidth: "1000px",
    margin: "20px auto 20px auto",
    backgroundColor: "blue",
    borderRadius:"10px",
  },
  wCircles: {
    backgroundColor: "white",
    borderRadius: "50%",
    minWidth: "110px",
    minHeight: "100px"
  },
  rCircles: {
    backgroundColor: "red",
    borderRadius: "50%",
    minWidth: "110px",
    minHeight: "100px"
  },
  yCircles: {
    backgroundColor: "yellow",
    borderRadius: "50%",
    minWidth: "110px",
    minHeight: "100px"
  },
  row: {
    margin: "10px"
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
      win:false
    };
  }

  directionCheck(x,y,n,direct){
    const {board} = this.state
    if (n == 3){
      if (board[x][y] == '1'){
        return 1
      }else if (board[x][y] == '2'){
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
  checkWin = () =>{
    for (let i = 0; i < 6; i++){
      for (let j = 0; j < 7; j++){
          if (this.directionCheck(i,j,0,'u') != 0){
            this.setState({
              win:true
            })
            return;
          }else if (this.directionCheck(i,j,0,'d') != 0){
            this.setState({
              win:true
            })
            return;
          }else if (this.directionCheck(i,j,0,'r') != 0){
            this.setState({
              win:true
            })
            return;
          }else if (this.directionCheck(i,j,0,'l') != 0){
            this.setState({
              win:true
            })
            return;
          }else if (this.directionCheck(i,j,0,'rh') != 0){
            this.setState({
              win:true
            })
            return;
          }else if (this.directionCheck(i,j,0,'lh') != 0){
            this.setState({
              win:true
            })
            return;
          }else if (this.directionCheck(i,j,0,'ll') != 0){
            this.setState({
              win:true
            })
            return;
          }else if (this.directionCheck(i,j,0,'rl') != 0){
            this.setState({
              win:true
            })
            return;
          }
      }
    }
  }
  clickFirstCol = () => {
    const { board } = this.state;
    const {matRend} = this.state;
    const {classes} = this.props;
    let {turn} = this.state
    let i;
      if (!this.state.win){
        for (i = 0; i < 6; i++) {
          if (board[i][0] == "1" || board[i][0] == "2") {
            if (turn == 1){
              board[i - 1][0] = "1";
              matRend[i-1][0] = (<Grid key={6*i} className={classes.yCircles} item />)
              turn = 2;
              break;
            }else if (turn == 2){
              board[i - 1][0] = "2";
              matRend[i-1][0] = (<Grid key={6*i} className={classes.rCircles} item />)
              turn = 1;
              break;
            }
          }
        }

        if (i == 6) {
          if (turn == 1){
            board[i - 1][0] = "1";
            matRend[i-1][0] = (<Grid key={6*i} className={classes.yCircles} item />)
            turn = 2;
          }else if (turn == 2){
            board[i - 1][0] = "2";
            matRend[i-1][0] = (<Grid key={6*i} className={classes.rCircles} item />)
            turn = 1;
          }
        }
        this.setState({
          board,
          matRend,
          turn
        });
        this.checkWin()
      }
  };

  clickSecondCol = () => {
    const { board } = this.state;
    const {matRend} = this.state;
    const {classes} = this.props;
    let {turn} = this.state
    let i;
    if (!this.state.win){
    for (i = 0; i < 6; i++) {
      if (board[i][1] == "1" || board[i][1] == "2") {
        if (turn == 1){
          board[i - 1][1] = "1";
          matRend[i-1][1] = (<Grid key={6*i+1} className={classes.yCircles} item />)
          turn = 2;
          break;
        }else if (turn == 2){
          board[i - 1][1] = "2";
          matRend[i-1][1] = (<Grid key={6*i+1} className={classes.rCircles} item />)
          turn = 1;
          break;
        }
      }
    }
    if (i == 6) {
      if (turn == 1){
        board[i - 1][1] = "1";
        matRend[i-1][1] = (<Grid key={6*i+1} className={classes.yCircles} item />)
        turn = 2;
      }else if (turn == 2){
        board[i - 1][1] = "2";
        matRend[i-1][1] = (<Grid key={6*i+1} className={classes.rCircles} item />)
        turn = 1;
      }
    }
    this.setState({
      board,
      matRend,turn
    });
    this.checkWin()
  }
  };

  clickThirdCol = () => {
    const { board } = this.state;
    const {matRend} = this.state;
    const {classes} = this.props;
    let {turn} = this.state;
    let i;
    if (!this.state.win){
      for (i = 0; i < 6; i++) {
        if (board[i][2] == "1" || board[i][2] == "2") {
          if (turn == 1){
            board[i - 1][2] = "1";
            matRend[i-1][2] = (<Grid key={6*i+2} className={classes.yCircles} item />)
            turn = 2;
            break;
          }else if (turn == 2){
            board[i - 1][2] = "2";
            matRend[i-1][2] = (<Grid key={6*i+2} className={classes.rCircles} item />)
            turn = 1;
            break;
          }
        }
      }
      if (i == 6) {
        if (turn == 1){
          board[i - 1][2] = "1";
          matRend[i-1][2] = (<Grid key={6*i+2} className={classes.yCircles} item />)
          turn = 2;
        }else if (turn == 2){
          board[i - 1][2] = "2";
          matRend[i-1][2] = (<Grid key={6*i+2} className={classes.rCircles} item />)
          turn = 1;
        }
      }
      this.setState({
        board,matRend,turn
      });
      this.checkWin()
    }
  };

  clickFourthCol = () => {
    const { board } = this.state;
    const {classes} = this.props;
    let {turn} = this.state;
    const {matRend} = this.state
    let i;
    if (!this.state.win){
      for (i = 0; i < 6; i++) {
        if (board[i][3] == "1" || board[i][3] == "2") {
          if (turn == 1){
            board[i - 1][3] = "1";
            matRend[i-1][3] = (<Grid key={6*i+3} className={classes.yCircles} item />)
            turn = 2;
            break;
          }else if (turn == 2){
            board[i - 1][3] = "2";
            matRend[i-1][3] = (<Grid key={6*i+3} className={classes.rCircles} item />)
            turn = 1;
            break;
          }
        }
      }
      if (i == 6) {
        if (turn == 1){
          board[i - 1][3] = "1";
          matRend[i-1][3] = (<Grid key={6*i+3} className={classes.yCircles} item />)
          turn = 2;
        }else if (turn == 2){
          board[i - 1][3] = "2";
          matRend[i-1][3] = (<Grid key={6*i+3} className={classes.rCircles} item />)
          turn = 1;
        }
      }
      this.setState({
        board,matRend,turn
      });
      this.checkWin()
    }
  };

  clickFifthCol = () => {
    const { board } = this.state;
    const {classes} = this.props;
    let {turn} = this.state;
    const {matRend} = this.state;
    let i;
    if (!this.state.win){
      for (i = 0; i < 6; i++) {
        if (board[i][4] == "1" || board[i][4] == "2") {
          if (turn == 1){
            board[i - 1][4] = "1";
            matRend[i-1][4] = (<Grid key={6*i+4} className={classes.yCircles} item />)
            turn = 2;
            break;
          }else if (turn == 2){
            board[i - 1][4] = "2";
            matRend[i-1][4] = (<Grid key={6*i+4} className={classes.rCircles} item />)
            turn = 1;
            break;
          }
        }
      }
      if (i == 6) {
        if (turn == 1){
          board[i - 1][4] = "1";
          matRend[i-1][4] = (<Grid key={6*i+4} className={classes.yCircles} item />)
          turn = 2;
        }else if (turn == 2){
          board[i - 1][4] = "2";
          matRend[i-1][4] = (<Grid key={6*i+4} className={classes.rCircles} item />)
          turn = 1;
        }
      }
      console.log(board);
      this.setState({
        board,matRend,turn
      });
      this.checkWin()
    }
  };

  clickSixthCol = () => {
    const { board } = this.state;
    const {classes} = this.props;
    let {turn} = this.state;
    const {matRend} = this.state;
    let i;
    if (!this.state.win){
      for (i = 0; i < 6; i++) {
        if (board[i][5] == "1" || board[i][5] == "2") {
          if (turn == 1){
            board[i - 1][5] = "1";
            matRend[i-1][5] = (<Grid key={6*i+5} className={classes.yCircles} item />)
            turn = 2;
            break;
          }else if (turn == 2){
            board[i - 1][5] = "2";
            matRend[i-1][5] = (<Grid key={6*i+5} className={classes.rCircles} item />)
            turn = 1;
            break;
          }
        }
      }
      if (i == 6) {
        if (turn == 1){
          board[i - 1][5] = "1";
          matRend[i-1][5] = (<Grid key={6*i+5} className={classes.yCircles} item />)
          turn = 2;
        }else if (turn == 2){
          board[i - 1][5] = "2";
          matRend[i-1][5] = (<Grid key={6*i+5} className={classes.rCircles} item />)
          turn = 1;
        }
      }
      this.setState({
        board,matRend,turn
      });
      this.checkWin()
    }
  };

  clickSeventhCol = () => {
    const { board } = this.state;
    const {classes} = this.props;
    let {turn} = this.state;
    const {matRend} = this.state;
    let i;
    if (!this.state.win){
      for (i = 0; i < 6; i++) {
        if (board[i][6] == "1" || board[i][6] == "2") {
          if (turn == 1){
            board[i - 1][6] = "1";
            matRend[i-1][6] = (<Grid key={6*i+6} className={classes.yCircles} item />)
            turn = 2;
            break;
          }else if (turn == 2){
            board[i - 1][6] = "2";
            matRend[i-1][6] = (<Grid key={6*i+6} className={classes.rCircles} item />)
            turn = 1;
            break;
          }
        }
      }
      if (i == 6) {
        if (turn == 1){
          board[i - 1][6] = "1";
          matRend[i-1][6] = (<Grid key={6*i+6} className={classes.yCircles} item />)
          turn = 2;
        }else if (turn == 2){
          board[i - 1][6] = "2";
          matRend[i-1][6] = (<Grid key={6*i+6} className={classes.rCircles} item />)
          turn = 1;
        }
      }
      this.setState({
        board,matRend,turn
      });
      this.checkWin()
    }

  };

  drawBoard = () => {
    const { classes } = this.props;
    const { matRend } = this.state;
    const { board } = this.state;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        const key = 6 * i + j;
        if (board[i][j] == "0") {
          if (j == 0) {
            matRend[i].push(
              <Grid key={key} className={classes.wCircles} item>
                <Button
                  className={classes.wCircles}
                  onClick={this.clickFirstCol}
                />
              </Grid>
            );
          } else if (j == 1) {
            matRend[i].push(
              <Grid key={key} className={classes.wCircles} item>
                <Button
                  className={classes.wCircles}
                  onClick={this.clickSecondCol}
                />
              </Grid>
            );
          } else if (j == 2) {
            matRend[i].push(
              <Grid key={key} className={classes.wCircles} item>
                <Button
                  className={classes.wCircles}
                  onClick={this.clickThirdCol}
                />
              </Grid>
            );
          } else if (j == 3) {
            matRend[i].push(
              <Grid key={key} className={classes.wCircles} item>
                <Button
                  className={classes.wCircles}
                  onClick={this.clickFourthCol}
                />
              </Grid>
            );
          } else if (j == 4) {
            matRend[i].push(
              <Grid key={key} className={classes.wCircles} item>
                <Button
                  className={classes.wCircles}
                  onClick={this.clickFifthCol}
                />
              </Grid>
            );
          } else if (j == 5) {
            matRend[i].push(
              <Grid key={key} className={classes.wCircles} item>
                <Button
                  className={classes.wCircles}
                  onClick={this.clickSixthCol}
                />
              </Grid>
            );
          } else if (j == 6) {
            matRend[i].push(
              <Grid key={key} className={classes.wCircles} item>
                <Button
                  className={classes.wCircles}
                  onClick={this.clickSeventhCol}
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
    return (
      <div>
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
      </div>
    );
  }
}

export default withStyles(styles)(Game);
