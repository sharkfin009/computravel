 <template>
  <iframe
    src="https://www.travelstart.co.za/?search=false&show_banners=false&log=false&affId=1217489&language=&affCampaign=&utm_source=affiliate&utm_medium=1217489&isiframe=true&landing_page=false&iframeVersion=11&host=https:%2F%2Fcomputravel.co.za"
    frameBorder="0"
    scrolling="auto"
    style="
      padding: 0px;
      border: 0px;
      height: 0px;
      background-color: #fafafa;
      z-index: -50;
    "
  >
  </iframe>
</template>

<script setup>
definePageMeta({
  layout: "home",
});
</script>



<style>
/* @keyframes spinner {
        0% {
            transform: translate3d(-50%, -50%, 0) rotate(0deg);
        }

        100% {
            transform: translate3d(-50%, -50%, 0) rotate(360deg);
        }
    } */

.spin::before {
  animation: 1.5s linear infinite spinner;
  animation-play-state: inherit;
  border: solid 5px #cfd0d1;
  border-bottom-color: #1c87c9;
  border-radius: 50%;
  content: "";
  height: 40px;
  width: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  /* transform: translate3d(-50%, -50%, 0); */
  will-change: transform;
}

iframe {
  height: 60vh !important;
  width: 100%;
}
</style>