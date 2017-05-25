using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Storage
{
    public class ListItemStringComparer : IEqualityComparer<ListItem<string, string>>
    {
        public bool Equals(ListItem<string, string> x, ListItem<string, string> y)
        {
            return x.Key == y.Key && x.Item == y.Item;
        }

        public int GetHashCode(ListItem<string, string> obj)
        {
            return new { obj.Key, obj.Item }.GetHashCode();
        }
    }
    public class ListItem<TKey, TItem>
    {
        public TKey Key { get; set; }

        public TItem Item { get; set; }
    }
}
