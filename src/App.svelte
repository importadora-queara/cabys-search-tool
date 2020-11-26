<script lang="ts">
  import {
    Content,
    Grid,
    Row,
    Column,
    Search,
    PaginationNav,
    Button,
    OrderedList,
    ListItem,
    ClickableTile,
    Modal,
    ModalFooter,
    ComposedModal,
    ModalBody,
    ModalHeader
  } from "carbon-components-svelte";

  import Header from "./components/Header.svelte";
  import Theme from "./components/Theme.svelte";
  import data from "./data/CAByS JSON Data.json";
  import Fuse from "fuse.js";

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
  }

  function handlePageChange(pageNumaber: number, itemsPerPage: number) {
    const sliceIndexStart = pageNumaber * itemsPerPage;
    resultsPage = [
      ...searchResults.slice(sliceIndexStart, sliceIndexStart + itemsPerPage)
    ];
  }

  function handleResultClick(item: any) {
    currentSelectedItem = { ...item };
    open = true;
  }
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
              total={numberOfPages}
              shown={10}
              on:change={(e) => {
                handlePageChange(e.detail.page, 25);
              }} />
          </Column>
        </Row>
        {#if currentSelectedItem}
          <ComposedModal passiveModal size="lg" bind:open>
            <ModalHeader title="Información del Resultado" />
            <ModalBody>
              {#each Array(9) as _, i}
                <p>
                  <strong>{currentSelectedItem.item[`field${i * 2 + 1}`]}
                    -</strong>
                  {currentSelectedItem.item[`field${i * 2 + 2}`]}
                </p>
              {/each}
            </ModalBody>
            <ModalFooter style="text-align: center; display: block;">
              <h4>IVA: {currentSelectedItem.item.field19}</h4>
            </ModalFooter>
          </ComposedModal>
        {/if}
      {/if}
    </Grid>
  </Content>
</Theme>
