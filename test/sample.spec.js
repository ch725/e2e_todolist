describe('add todo', function () {
    let page;
    
    before (async function () {
      page = await browser.newPage();
      await page.goto('http://localhost:7001/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('Koa • Todo');
    })
    it('should new todo correct', async function() {
      await page.click('#new-todo', {delay: 500});
      await page.type('#new-todo', 'new todo item', {delay: 50});
      await page.keyboard.press("Enter");
      let todoList = await page.waitFor('#todo-list');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);

      expect(expectInputContent).to.eql('new todo item');
    }) 

    it('should have all todos',async function(){
      const length = await page.evaluate(() =>{
        let list = document.querySelectorAll('label');
        return list.length-1
      })
      expect(length).to.eql(1)
    })
    
    it('should complete todo correct',async function(){
      await page.click('#todo-list > li > div > input');
      let todoList = await page.waitFor('#todo-list > li.completed');
      const expectResult = await page.evaluate(todoList => todoList.querySelector('label').textContent, todoList);
     
      expect(expectResult).to.eql('new todo item')
    })
  });