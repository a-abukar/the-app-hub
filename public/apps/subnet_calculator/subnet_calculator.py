import sys
import json
import ipaddress

def calculate_subnet(network, subnet_mask):
    try:
        subnet_mask = int(subnet_mask)
        network = ipaddress.IPv4Network(f"{network}/{subnet_mask}", strict=False)
        result = {
            "network_address": str(network.network_address),
            "broadcast_address": str(network.broadcast_address),
            "subnet_mask": str(network.netmask),
            "number_of_addresses": network.num_addresses,
            "number_of_usable_addresses": network.num_addresses - 2,
            "usable_host_range": f"{network.network_address + 1} - {network.broadcast_address - 1}"
        }
        return result
    except ValueError as e:
        return {"error": str(e)}

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.stdin.read())
        network = input_data['network']
        subnet_mask = input_data['subnetMask']
        result = calculate_subnet(network, subnet_mask)
        print(json.dumps(result))
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
