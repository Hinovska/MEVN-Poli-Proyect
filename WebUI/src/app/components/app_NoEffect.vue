<template>
  <div>
    <nav class="navbar navbar.light bg-light">
      <a href="/" class="navbar-brand">
        <svg class="bi bi-card-image" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z" clip-rule="evenodd"/>
          <path d="M10.648 7.646a.5.5 0 01.577-.093L15.002 9.5V13h-14v-1l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71z"/>
          <path fill-rule="evenodd" d="M4.502 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clip-rule="evenodd"/>
        </svg>
        Draw Track
      </a>
      <a href="/api/track" class="navbar-brand" target="_blank">
        <svg class="bi bi-file-text" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/>
          <path fill-rule="evenodd" d="M4.5 10.5A.5.5 0 015 10h3a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-2A.5.5 0 015 8h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-2A.5.5 0 015 6h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-2A.5.5 0 015 4h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>
        </svg>
        Data Track
      </a>
    </nav>
    <div class="py-3 text-center">
      <svg class="bi bi-map d-block mx-auto mb-4" width="72px" height="72px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M15.817.613A.5.5 0 0116 1v13a.5.5 0 01-.402.49l-5 1a.502.502 0 01-.196 0L5.5 14.51l-4.902.98A.5.5 0 010 15V2a.5.5 0 01.402-.49l5-1a.5.5 0 01.196 0l4.902.98 4.902-.98a.5.5 0 01.415.103zM10 2.41l-4-.8v11.98l4 .8V2.41zm1 11.98l4-.8V1.61l-4 .8v11.98zm-6-.8V1.61l-4 .8v11.98l4-.8z" clip-rule="evenodd"/>
      </svg>
      <h2>Prometheus - Track View</h2>
      <p class="lead">Visualization of movements executed by cart using myoelectric signals.</p>
    </div>
    <div class="container">
      <div class="row pt-2">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Direction</th>
                    <th>Move</th>
                    <th> Time History
                      <svg class="bi bi-clock-history" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8.515 1.019A7 7 0 008 1V0a8 8 0 01.589.022l-.074.997zm2.004.45a7.003 7.003 0 00-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 00-.439-.27l.493-.87a8.025 8.025 0 01.979.654l-.615.789a6.996 6.996 0 00-.418-.302zm1.834 1.79a6.99 6.99 0 00-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 00-.214-.468l.893-.45a7.976 7.976 0 01.45 1.088l-.95.313a7.023 7.023 0 00-.179-.483zm.53 2.507a6.991 6.991 0 00-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 01-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 01-.401.432l-.707-.707z" clip-rule="evenodd"/>
                        <path fill-rule="evenodd" d="M8 1a7 7 0 104.95 11.95l.707.707A8.001 8.001 0 118 0v1z" clip-rule="evenodd"/>
                        <path fill-rule="evenodd" d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
                      </svg>
                    </th>
                  </tr>
                </thead>
                <tbody>

                    <tr v-for="mov of latestMoves">
                      <td class="iconContent">
                        <template v-if="mov.move=='front'">
                          <svg class="bi bi-caret-up-fill graph" width="2em" height="2em" viewBox="0 1 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z"/>
                          </svg>
                        </template>
                        <template v-if="mov.move=='right'">
                          <svg class="bi bi-caret-right-fill graph" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 011.659-.753l5.48 4.796a1 1 0 010 1.506z"/>
                          </svg>
                        </template>
                        <template v-if="mov.move=='backward'">
                          <svg class="bi bi-caret-down-fill graph" width="2em" height="2em" viewBox="0 -1 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z"/>
                          </svg>
                        </template>
                        <template v-if="mov.move=='left'">
                          <svg class="bi bi-caret-left-fill graph" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 00-1.659-.753l-5.48 4.796a1 1 0 000 1.506z"/>
                          </svg>
                        </template>
                      </td>
                      <td class="dirContent">{{mov.move}}</td>
                      <td class="dateContent">{{mov.created}}</td>
                    </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="javascript" lang="javascript">

  class Move {
    constructor (move, date){
      this.move = move || '';
      this.created = date || '';
    }
  }

  export default {
    data() {
      return {
        move: new Move(),
        latestMoves: [],
        timeoutFlag: 0,
        getInterval: 5000
      }
    },
    created() {
      this.getMoves();
    },
    methods: {
      getMoves() {
        fetch('/api/track', {
          method: 'GET',
          //method: 'POST',
          //body: JSON.stringify(this.move),
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(moves => {
          if (moves && moves.length > 0){
            //console.log(this.latestMoves.length);
            if (this.latestMoves.length > 0){
              let itemsAdded = 0;
              moves.map((item) => {
                if (!this.latestMoves.filter((s)=>{ return s._id == item._id} ).length > 0){
                  this.latestMoves.push(item);
                  itemsAdded += 1;
                  //console.log(item);
                  //console.log(this.latestMoves);
                }
              });
              //console.log("add items : " +itemsAdded);
              if (itemsAdded > 0){
                this.latestMoves.sort(function(a, b){
                  return new Date(b.created) - new Date(a.created);
                });
                this.move = new Move();
              }
            }
            else {
              //console.log("Set All items" + moves.length);
              this.latestMoves = moves;
              this.latestMoves.sort(function(a, b){
                return new Date(b.created) - new Date(a.created);
              });
              this.move = new Move();
              //console.log(this.latestMoves);
            }
          }
          this.autoUpdate();
        }).catch((error) => {
          console.log(error);
          this.autoUpdate();
        });
      },
      autoUpdate() {
        if (this.timeoutFlag && this.timeoutFlag > 0){
          clearTimeout(this.timeoutFlag);
        }
        this.timeoutFlag = setTimeout(()=>{
          this.getMoves();
        }, this.getInterval);
      }
    }
  }

</script>
