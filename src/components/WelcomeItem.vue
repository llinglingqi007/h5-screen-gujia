<template>
  <div class="item">
    <!-- <i>
      <slot name="icon"></slot>
    </i> -->
    <div class="details">
      <h3 class="tracking-wider">
        <div class="title">
          <slot name="heading"></slot>
          <p class="heading-bg"></p>
        </div>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  margin-top: 20px;
  display: flex;
  .details {
    width: 100%;
    h3 {
      font-size: 1.2rem;
      margin-bottom: 15px;
      color: var(--color-heading);
      font-size: 20px;
      font-family: PangMenZhengDao;
      opacity: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .title {
        position: relative;
        padding: 0 13px;
      }
      .heading-bg{
        position: absolute;
        top: 14px;
        left: 0;
        width: 100%;
        height: 13px;
        background: linear-gradient(360deg, rgba(0,128,255,0.8) 0%, rgba(0,128,255,0.62) 17%, rgba(0,128,255,0.4) 40%, rgba(0,128,255,0.23) 60%, rgba(0,128,255,0.11) 78%, rgba(0,128,255,0.03) 92%, rgba(0,128,255,0) 100%);
        opacity: 1;
        border-radius: 6px;
      }
    }
  }
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}



@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
