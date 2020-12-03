<script lang="ts">
  import {
    Content,
    Grid,
    Row,
    Column,
    Search,
    PaginationNav,
    Button,
    ClickableTile,
    ComposedModal,
    ModalBody,
    ModalHeader,
    CopyButton
  } from "carbon-components-svelte";

  import Header from "./components/Header.svelte";
  import Theme from "./components/Theme.svelte";
  import data from "./data/filteredData.json";
  import Fuse from "fuse.js";
  import { onMount } from "svelte";

  const options = {
    shouldSort: true,
    includeMatches: true,
    keys: [
      "field2",
      "field4",
      "field6",
      "field8",
      "field10",
      "field12",
      "field14",
      "field16",
      "field17"
    ]
  };

  const fuse = new Fuse(data, options);

  let theme: "white" = "white";

  let searchQuery = "";
  let searchResults: any;
  let resultsPage: any = [];
  let numberOfPages = 0;
  let open = false;
  let currentSelectedItem: any;

  function handleSearch() {
    searchResults = fuse.search(searchQuery);
    resultsPage = [...searchResults.slice(0, 25)];
    numberOfPages = Math.floor(searchResults.length / 25);
    setTimeout(
      () =>
        document
          .getElementsByTagName("nav")[0]
          .children[0].children[1].children[0].click(),
      250
    );
  }

  function handlePageChange(pageNumaber: number, itemsPerPage: number) {
    const sliceIndexStart = pageNumaber * itemsPerPage;
    resultsPage = [
      ...searchResults.slice(sliceIndexStart, sliceIndexStart + itemsPerPage)
    ];
  }

  function handleResultClick(item: any) {
    scrollTo(0, 0);
    if (!window.navigator.vibrate(1000)) alert("not working...");
    currentSelectedItem = { ...item };
    open = true;
  }

  function handleCopy(content: string) {
    navigator.clipboard.writeText(content).catch((e) => console.log(error));
  }

  let ref: any;

  onMount(() => {
    console.log("ref: ", ref);
  });
</script>

<style>
</style>

<Theme persist bind:theme>
  <Header />
  <Content style="background: none; padding: 1rem">
    <Grid>
      <Row>
        <Column lg={14}>
          <Search placeholder="Buscar" autofocus bind:value={searchQuery} />
        </Column>
        <Column>
          <Button on:click={handleSearch}>Buscar</Button>
        </Column>
      </Row>

      {#if searchResults}
        <Row>
          <Column>
            {#each resultsPage as item}
              <ClickableTile on:click={() => handleResultClick(item)}>
                {item.item.field18}
              </ClickableTile>
            {/each}
          </Column>
        </Row>

        <Row>
          <Column>
            <PaginationNav
              bind:ref
              total={numberOfPages}
              shown={10}
              on:change={(e) => {
                handlePageChange(e.detail.page, 10);
              }} />
          </Column>
        </Row>
      {/if}
    </Grid>{#if currentSelectedItem}
      <ComposedModal passiveModal size="lg" bind:open>
        <ModalHeader title="Información del Resultado" />
        <ModalBody>
          <Grid>
            {#each Array(9) as _, i}
              <Row>
                <Column>
                  <p>
                    <strong>{currentSelectedItem.item[`field${i * 2 + 1}`]}
                      -</strong>
                    {currentSelectedItem.item[`field${i * 2 + 2}`]}
                  </p>
                </Column>
              </Row>
            {/each}
            <Row style="margin-top:2em">
              <Column lg={8}>
                <h4 style="float: left">
                  Código:
                  {currentSelectedItem.item.field17}
                </h4>
                <CopyButton
                  on:click={() => handleCopy(currentSelectedItem.item.field17)} />
              </Column>
            </Row>
          </Grid>
        </ModalBody>
      </ComposedModal>
    {/if}
  </Content>
</Theme>
