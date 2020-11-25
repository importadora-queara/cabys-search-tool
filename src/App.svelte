<script lang="ts">
  import {
    Content,
    Grid,
    Row,
    Column,
    ComboBox,
    Breadcrumb,
    BreadcrumbItem
  } from "carbon-components-svelte";
  import Header from "./components/Header.svelte";
  import Theme from "./components/Theme.svelte";
  import { onMount } from "svelte";
  import data from "./data/CAByS JSON Data.json";

  type ComboBoxItem = {
    id: string;
    text: string;
  };

  // let category1Items: ComboBoxItem[] = [];
  // let category2Items: ComboBoxItem[] = [];
  // let category3Items: ComboBoxItem[] = [];
  // let category4Items: ComboBoxItem[] = [];
  // let category5Items: ComboBoxItem[] = [];
  // let category6Items: ComboBoxItem[] = [];
  // let category7Items: ComboBoxItem[] = [];
  // let category8Items: ComboBoxItem[] = [];
  // let category9Items: ComboBoxItem[] = [];

  let items: ComboBoxItem[] = [];

  data.map((item: any, i) => {
    if (i === 0) return;

    const category1 = item.field1;

    // Do not include 0, 1, 2, 5, 6, 7, 8, 9
    switch (category1) {
      case "0":
        break;
      case "1":
        break;
      case "2":
        break;
      case "5":
        break;
      case "6":
        break;
      case "7":
        break;
      case "8":
        break;
      case "9":
        break;
      default: {
        items.push({ id: item.field17, text: item.field18 });
      }
    }

    // if (category1Items.length) {
    //   if (category1Items[category1Items.length - 1].id !== item.field1) {
    //     category1Items.push({ id: item.field1, text: item.field2 });

    //     if (category2Items.length) {
    //       if (category2Items[category2Items.length - 1].id !== item.field3) {
    //         category2Items.push({ id: item.field3, text: item.field4 });
    //       }
    //     } else category2Items.push({ id: item.field3, text: item.field4 });
    //   }
    // } else category1Items.push({ id: item.field1, text: item.field2 });
  });

  let theme: "white" = "white";

  let comboBox1Ref: HTMLInputElement;
  let selectedItem: ComboBoxItem;
  let dataItem: any;

  function fuzzySearch(item: ComboBoxItem, value: string): boolean {
    if (!value) return true;
    else {
      const matchExp = RegExp(value, "g");
      const res = item.text.match(matchExp);
      if (res) return true;
      else return false;
    }
  }

  function getFilteredItems(
    originalList: ComboBoxItem[],
    parentCategoryId: string
  ) {
    const newList: ComboBoxItem[] = [];
    originalList.map((item) => {
      if (parentCategoryId === item.id.slice(0, parentCategoryId.length))
        newList.push({ ...item });
    });

    return newList;
  }
</script>

<style>
  div {
    margin-top: 2.5em;
    margin-bottom: 2.5em;
  }
</style>

<Theme persist bind:theme>
  <Header />
  <Content style="background: none; padding: 1rem">
    <Grid>
      <Row>
        <Column lg={16}>
          <ComboBox
            bind:ref={comboBox1Ref}
            titleText="Buscar"
            {items}
            placeholder="Filtrar..."
            shouldFilterItem={fuzzySearch}
            on:select={(e) => {
              selectedItem = e.detail.selectedItem;

              dataItem = data.find((item) => item.field17 === selectedItem.id);
            }} />
        </Column>
        {#if dataItem}
          <div />
          <Column lg={16}>
            <p><strong>{dataItem.field1} - </strong> {dataItem.field2}</p>
            <p><strong>{dataItem.field3} - </strong> {dataItem.field4}</p>
            <p><strong>{dataItem.field5} - </strong> {dataItem.field6}</p>
            <p><strong>{dataItem.field7} - </strong> {dataItem.field8}</p>
            <p><strong>{dataItem.field9} - </strong> {dataItem.field10}</p>
            <p><strong>{dataItem.field11} - </strong> {dataItem.field12}</p>
            <p><strong>{dataItem.field13} - </strong> {dataItem.field14}</p>
            <p><strong>{dataItem.field15} - </strong> {dataItem.field16}</p>
            <p>{dataItem.field18}</p>
          </Column>
          <div />
          <Column lg={16}>
            <h4 style="text-align: center">Codigo: {dataItem.field17}</h4>

            <h3 style="text-align: center">IVA: {dataItem.field19}</h3>
          </Column>
        {/if}
      </Row>
    </Grid>
  </Content>
</Theme>
