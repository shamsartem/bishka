<style global lang="postcss">
  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  html {
    display: flex;
    min-height: 100%;
    font-family: var(--ff-default);
    font-size: var(--fz-md);
    line-height: var(--lh-md);
  }

  body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    min-width: 320px;
    color: var(--c-gray-1);
  }

  #sapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
  }

  .visuallyHidden {
    position: absolute !important;
    top: -9999px !important;
    left: -9999px !important;
    width: 1px !important;
    height: 1px !important;
    margin: -1px !important;
    padding: 0 !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    border-width: 0 !important;
  }
</style>
