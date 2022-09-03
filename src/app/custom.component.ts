ngAfterViewInit() {
    let loaderService = this.loaderService;
    d3.json("https://...", function(data) {
        createChart(data);
    });
    function createChart(data) {
        ...

        dc.renderAll();
        loaderService.display(false);
    }//end of function  
  }//end of ngAfterView