<template>
    <footer>
        <div class="content">
            <p>
                If you want to contribute, 
                you can send pull requests to this 
                <a href="https://github.com/gautemo/codewars-language-leaderboard" target="_blank" rel="noopener">GitHub repository</a>
            </p>
            <p class="me">
                <span class="createdby">Created by: Gaute Meek Olsen</span>
                <Twitter />    
                <GitHub />
                <Portofolio size="20" />
            </p>
        </div>
    </footer>
</template>

<script>
import Twitter from './icons/Twitter';
import GitHub from './icons/GitHub';
import Portofolio from './icons/Portofolio';

export default {
  components: {
    Twitter,
    GitHub,
    Portofolio,
  }
}
</script>

<style scoped>
.me{
    display: flex;
    align-items: center;
    height: 30px;
}
.createdby{
    margin-right: 5px;
}
</style>