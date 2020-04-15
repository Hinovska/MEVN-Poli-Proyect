<template>
  <div>
    <nav class="navbar navbar.light bg-light">
      <a href="/" class="navbar-brand">Track Remote Car</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Direction</th>
                    <th>Move</th>
                    <th>Date Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="mov of latestMoves">
                    <td>
                      <template v-if="mov.move=='front'">
                        <svg class="bi bi-chevron-up" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z" clip-rule="evenodd"/>
                        </svg>
                      </template>
                      <template v-if="mov.move=='rigth'">
                        <svg class="bi bi-chevron-right" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z" clip-rule="evenodd"/>
                        </svg>
                      </template>
                      <template v-if="mov.move=='backward'">
                        <svg class="bi bi-chevron-down" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" clip-rule="evenodd"/>
                        </svg>
                      </template>
                      <template v-if="mov.move=='left'">
                        <svg class="bi bi-chevron-left" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                        </svg>
                      </template>
                    </td>
                    <td>{{mov.move}}</td>
                    <td>{{mov.created}}</td>
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
        getInterval: 2000
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
          this.latestMoves = moves;
          console.log(this.latestMoves);
          this.autoUpdate();
        });
        this.move = new Move();
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
