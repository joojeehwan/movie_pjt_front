<template>
  <!-- 03_community.html -->
  <div class="main container" style="margin-top: 83px; margin-bottom: 40px;">
    <h1 class="text-center fw-bold p-4 col-12">CommunityHome vue</h1>
    <div class="row"> 
      <!-- Sidebar -->
      <aside class="col-12 col-lg-2">
        <ul class="list-group">
          <a href="#" class="list-group-item" style="color: blue;">Boxoffice</a>
          <a href="#" class="list-group-item" style="color: blue;">Movies</a>
          <a href="#" class="list-group-item" style="color: blue;">Genres</a>
          <a href="#" class="list-group-item" style="color: blue;">Actors</a>
        </ul>      
      </aside>

      <!-- Board -->
      <section class="col-12 col-lg-10">
        <div class="d-none d-lg-block px-4">
          <table class="table table-striped table-hover">
            <thead>
              <tr class="table-dark">
                <th scope="col">영화 제목</th>
                <th scope="col">글제목</th>
                <th scope="col">작성자</th>
                <th scope="col">작성 시간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">바람과 함께 사라지다</th>
                <td>좋아요</td>
                <td>bbb</td>
                <td>1 minutes ago</td>
              </tr>
              <tr>
                <th scope="row">인터스텔라</th>
                <td>재밌어요</td>
                <td>ccc</td>
                <td>1 minutes ago</td>
              </tr>
              <tr>
                <th scope="row">크루엘라</th>
                <td>감동적이에요</td>
                <td>ddd</td>
                <td>1 minutes ago</td>
              </tr>
              <tr>
                <th scope="row">바람과 함께 사라지다</th>
                <td>좋아요</td>
                <td>bbb</td>
                <td>1 minutes ago</td>
              </tr>
              <tr>
                <th scope="row">인터스텔라</th>
                <td>재밌어요</td>
                <td>ccc</td>
                <td>1 minutes ago</td>
              </tr>
              <tr>
                <th scope="row">크루엘라</th>
                <td>감동적이에요</td>
                <td>ddd</td>
                <td>1 minutes ago</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="d-lg-none">
          <article>
            <div>
              <hr>
              <div class="d-flex justify-content-between">
                <p class="fw-bold">바람과 함께 사라지다</p>
                <p>aaa</p>              
              </div>
              좋아요. <br> 1 minutes ago
            </div>
          </article>
          <article>
            <div>
              <hr>
              <div class="d-flex justify-content-between">
                <p class="fw-bold">인터스텔라</p>
                <p>bbb</p>              
              </div>
              재밌어요. <br> 1 minutes ago
            </div>
          </article>
          <article>
            <div>
              <hr>
              <div class="d-flex justify-content-between">
                <p class="fw-bold">크루엘라</p>
                <p>ccc</p>              
              </div>
              감동적이에요. <br> 1 minutes ago
            </div>
          </article>
          <article>
            <div>
              <hr>
              <div class="d-flex justify-content-between">
                <p class="fw-bold">바람과 함께 사라지다</p>
                <p>aaa</p>              
              </div>
              좋아요. <br> 1 minutes ago
            </div>
          </article>
          <article>
            <div>
              <hr>
              <div class="d-flex justify-content-between">
                <p class="fw-bold">인터스텔라</p>
                <p>bbb</p>              
              </div>
              재밌어요. <br> 1 minutes ago
            </div>
          </article>
          <article>
            <div>
              <hr>
              <div class="d-flex justify-content-between">
                <p class="fw-bold">크루엘라</p>
                <p>ccc</p>              
              </div>
              감동적이에요. <br> 1 minutes ago
            </div>
          </article>
        </div>

        <!-- paginator -->
        <ul class="pagination p-4 justify-content-center">
          <li class="page-item ">
            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>